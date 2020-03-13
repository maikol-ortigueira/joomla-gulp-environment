<?php
/**
 * @version    [version]
 * @package    Com_[Component]
 * @author     [author] <[authorEmail]>
 * @copyright  [copyright]
 * @license    [license]
 */

use \Joomla\CMS\MVC\Controller\BaseController;
use \Joomla\CMS\Factory;
use \Joomla\CMS\Language\Text;

// No direct access
defined('_JEXEC') or die;

// Access check.
if (!Factory::getUser()->authorise('core.manage', 'com_[component]'))
{
	throw new Exception(Text::_('JERROR_ALERTNOAUTHOR'));
}

// Include dependancies
jimport('joomla.application.component.controller');

JLoader::registerPrefix('[Component]', JPATH_COMPONENT_ADMINISTRATOR);
JLoader::register('[Component]Helper', JPATH_COMPONENT_ADMINISTRATOR . DIRECTORY_SEPARATOR . 'helpers' . DIRECTORY_SEPARATOR . '[component].php');

$controller = BaseController::getInstance('[Component]');
$controller->execute(Factory::getApplication()->input->get('task'));
$controller->redirect();
