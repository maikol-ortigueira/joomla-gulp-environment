<?php
/**
* @version    [version]
* @package    Com_[Component]
* @author     [author] <[authorEmail]>
* @copyright  [copyright]
* @license    [license]
*/

// No direct access
defined('_JEXEC') or die;

jimport('joomla.application.component.controllerform');

/**
* [Singular] controller class.
*
* @since  1.6
*/
class [Component]Controller[Singular] extends \Joomla\CMS\MVC\Controller\FormController
{
	/**
	* Constructor
	*
	* @throws Exception
	*/
	public function __construct()
	{
		$this->view_list = '[plural]';
		parent::__construct();
	}
}
