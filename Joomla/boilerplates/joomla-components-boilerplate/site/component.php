<?php
/**
 * @version    [version]
 * @package    Com_[Component]
 * @author     [author] <[authorEmail]>
 * @copyright  [copyright]
 * @license    [license]
 */

defined('_JEXEC') or die;

use \Joomla\CMS\Factory;
use \Joomla\CMS\MVC\Controller\BaseController;

// Include dependancies
jimport('joomla.application.component.controller');

JLoader::registerPrefix('[Component]', JPATH_COMPONENT);
JLoader::register('[Component]Controller', JPATH_COMPONENT . '/controller.php');


// Execute the task.
$controller = BaseController::getInstance('[Component]');
$controller->execute(Factory::getApplication()->input->get('task'));
$controller->redirect();
