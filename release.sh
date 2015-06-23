#!/usr/bin/env bash

# install dependencies
echo "installing dependencies";
npm install; bower install

# minify & compress files
echo "minifying and compressing files";
gulp deploy

PROJECT_NAME="node-boilerplate"
CWD="$PWD"
USER="$(whoami)"

function update_supervisor_config {
  echo "updating supervisor config";
  sudo cp supervisor.conf /etc/supervisor/conf.d/"$PROJECT_NAME".conf
  echo "creating supervisor log folder";
  sudo mkdir -p /var/log/supervisord/"$PROJECT_NAME"
  echo "reloading supervisor config";
  sudo supervisorctl update
  echo "restoring supervisor local config file";
  git checkout supervisor.conf
}

function update_monit_config {
  echo "updating monit config";
  sudo cp monit.conf /etc/monit/conf.d/"$PROJECT_NAME"
  echo "reloading monit config";
  sudo /usr/bin/monit reload
  echo "restoring monit local config file";
  git checkout monit.conf
}

echo "replacing template variables in config files";
sed -i "s:{{CWD}}:$CWD:g" nginx.conf
sed -i "s:{{USER}}:$USER:g" supervisor.conf
sed -i "s:{{CWD}}:$CWD:g" supervisor.conf
sed -i "s:{{CWD}}:$CWD:g" monit.conf

if [ -f "/etc/supervisor/conf.d/$PROJECT_NAME.conf" ]; then
  # file exist
  echo "supervisor config file already exist";
  if `diff supervisor.conf /etc/supervisor/conf.d/"$PROJECT_NAME".conf > /dev/null` ; then
    # same
    echo "supervisor config file identical. start reloading";
    PID="$(sudo supervisorctl status | sed -n "/$PROJECT_NAME/s/.*pid \([[:digit:]]\+\).*/\1/p")"
    if ! [ -z "$PID" ]; then
      echo "app already running. send kill -HUP";
      kill -HUP "$PID"
    else
      echo "app not running. start it";
      sudo supervisorctl start "$PROJECT_NAME"
    fi
  else
    # different
    echo "supervisor config files different. start updating config";
    update_supervisor_config
  fi
else
  # file not exist
  echo "supervisor config file is not exist. start updating config";
  update_supervisor_config
fi

if [ -f "/etc/monit/conf.d/$PROJECT_NAME" ]; then
  # file exist
  echo "monit config file already exist";
  if ! `diff monit.conf /etc/monit/conf.d/"$PROJECT_NAME" > /dev/null` ; then
    # different
    echo "monit config files different. start updating config";
    update_monit_config
  fi
else
  # file not exist
  echo "monit config file is not exist. start updating config";
  update_monit_config
fi

MONITSTATUS=$(sudo /usr/bin/monit status | grep -C 1 "$PROJECT_NAME" | grep status | awk '{print $2}')

if [ ! "$MONITSTATUS" = "Running" ] && [ ! "$MONITSTATUS" = "Initializing" ] ; then
  echo "monit for this app is not running. start monitoring";
  sudo /usr/bin/monit start "$PROJECT_NAME"
fi

echo "updating nginx config";
sudo cp nginx.conf /etc/nginx/sites-available/"$PROJECT_NAME".conf
if ! [ -f "/etc/nginx/sites-enabled/$PROJECT_NAME.conf" ]; then
  echo "nginx config for this app is not enabled. enabling it";
  cd /etc/nginx/sites-enabled/ && sudo ln -s ../sites-available/"$PROJECT_NAME".conf
fi

echo "start reloading nginx config";
sudo /etc/init.d/nginx reload

echo "restoring nginx local config file";
git checkout nginx.conf

