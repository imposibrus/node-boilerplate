
import SessionFlashExtension from './extensions/SessionFlashExtension';
import basename from './filters/basename';

export default function(env, nunjucks) {
    SessionFlashExtension(env, nunjucks);
    basename(env);
}
