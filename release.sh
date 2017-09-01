#!/usr/bin/env bash

# install dependencies
echo "installing dependencies";
npm install; bower install

# minify & compress files
echo "minifying and compressing files";
./node_modules/.bin/gulp build

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

echo "Enter NEWRELIC_LICENSE key:"
read NEWRELIC_LICENSE

echo "replacing template variables in config files";
sed -i "s:{{CWD}}:$CWD:g" nginx.conf
sed -i "s:{{USER}}:$USER:g" supervisor.conf
sed -i "s:{{CWD}}:$CWD:g" supervisor.conf
sed -i "s:NEWRELIC_LICENSE=:NEWRELIC_LICENSE=$NEWRELIC_LICENSE:g" supervisor.conf

if [ -f "/etc/supervisor/conf.d/$PROJECT_NAME.conf" ]; then
  # file exist
  echo "supervisor config file already exist";
  if `diff supervisor.conf /etc/supervisor/conf.d/"$PROJECT_NAME".conf > /dev/null` ; then
    # same
    echo "supervisor config file identical. start reloading";
    PID="$(sudo supervisorctl status | sed -n "/$PROJECT_NAME/s/.*pid \([[:digit:]]\+\).*/\1/p")"
    if ! [ -z "$PID" ]; then
      echo "app already running. reload it";
      naught deploy --timeout 10
    else
      echo "app not running. start it";
      sudo supervisorctl start "$PROJECT_NAME"
      echo "restoring supervisor local config file";
      git checkout supervisor.conf
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

echo "updating nginx config";
sudo cp nginx.conf /etc/nginx/sites-available/"$PROJECT_NAME".conf
if ! [ -f "/etc/nginx/sites-enabled/$PROJECT_NAME.conf" ]; then
  echo "nginx config for this app is not enabled. enabling it";
  cd /etc/nginx/sites-enabled/ && sudo ln -s ../sites-available/"$PROJECT_NAME".conf
fi

echo "start reloading nginx config";
sudo /etc/init.d/nginx reload

echo "restoring nginx local config file";
cd $CWD
git checkout nginx.conf
