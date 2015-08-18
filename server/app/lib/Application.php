<?


namespace sensor;

use \Slim\Slim;

# Auto load the Slim classes.
Slim::registerAutoloader();


/**
 * Calculate the mode!
 *
 * @return string "production" or "deployment"
 */
function getMode() {
    $version = '<%= version %>';
    return strpos($version, 'version') === false ? 'production' : 'development';
}

/**
 *
 */
class Application extends Slim
{
  public function __construct()
  {
    parent::__construct(array(
      'mode' => getMode()
    ));
    # add the exception middleware
    $this->add(new Exception_Middleware());
  }

  public function sendResult($result, $statusCode = HTTP_OKAY)
  {
    $res = $this->response;
    $res->headers->set('Content-Type', 'application/json');
    if ($statusCode != HTTP_OKAY) {
      $res->setStatus($statusCode);
    }
    $res->setBody(json_encode($result));
  }

  public function getBodyJson()
  {
    $body = $this->request->getBody();
    return json_decode($body, true);
  }

}

?>
