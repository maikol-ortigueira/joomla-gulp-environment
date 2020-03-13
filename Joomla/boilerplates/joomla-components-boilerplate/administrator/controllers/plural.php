<?php
/**
* @version    [version]
* @package    Com_[Component]
* @author     [author] <[authorEmail]>
* @copyright  [copyright]
* @license    [license]
*/

// No direct access.
defined('_JEXEC') or die;

jimport('joomla.application.component.controlleradmin');

use \Joomla\Utilities\ArrayHelper;
use \Joomla\CMS\Session\session;
use \Joomla\CMS\Factory;
use \Joomla\CMS\Language\Text;

/**
* [Plural] list controller class.
*
* @since  1.6
*/
class [Component]Controller[Plural] extends \Joomla\CMS\MVC\Controller\AdminController
{
	/**
	* Method to clone existing [Plural]
	*
	* @return void
	*
	* @throws Exception
	*/
	public function duplicate()
	{
		// Check for request forgeries
		session::checkToken() or jexit(Text::_('JINVALID_TOKEN'));

		// Get id(s)
		$pks = $this->input->post->get('cid', array(), 'array');

		try
		{
			if (empty($pks))
			{
				throw new Exception(Text::_('COM_[COMPONENT]_NO_ELEMENT_SELECTED'));
			}

			ArrayHelper::toInteger($pks);
			$model = $this->getModel();
			$model->duplicate($pks);
			$this->setMessage(Text::_('COM_[COMPONENT]_ITEMS_SUCCESS_DUPLICATED'));
		}
		catch (Exception $e)
		{
			Factory::getApplication()->enqueueMessage($e->getMessage(), 'warning');
		}

		$this->setRedirect('index.php?option=com_[component]&view=[plural]');
	}

	/**
	* Proxy for getModel.
	*
	* @param   string  $name    Optional. Model name
	* @param   string  $prefix  Optional. Class prefix
	* @param   array   $config  Optional. Configuration array for model
	*
	* @return  object	The Model
	*
	* @since    1.6
	*/
	public function getModel($name = '[singular]', $prefix = '[Component]Model', $config = array())
	{
		$model = parent::getModel($name, $prefix, array('ignore_request' => true));

		return $model;
	}

	/**
	* Method to save the submitted ordering values for records via AJAX.
	*
	* @return  void
	*
	* @since   3.0
	*
	* @throws Exception
	*/
	public function saveOrderAjax()
	{
		// Get the input
		$input = Factory::getApplication()->input;
		$pks   = $input->post->get('cid', array(), 'array');
		$order = $input->post->get('order', array(), 'array');

		// Sanitize the input
		ArrayHelper::toInteger($pks);
		ArrayHelper::toInteger($order);

		// Get the model
		$model = $this->getModel();

		// Save the ordering
		$return = $model->saveorder($pks, $order);

		if ($return)
		{
			echo "1";
		}

		// Close the application
		Factory::getApplication()->close();
	}
}
