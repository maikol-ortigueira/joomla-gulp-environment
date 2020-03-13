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

use \Joomla\CMS\Factory;

/**
* [Component] helper.
*
* @since  1.6
*/
class [Component]Helper
{
	/**
	* Configure the Linkbar.
	*
	* @param   string  $vName  string
	*
	* @return void
	*/
	public static function addSubmenu($vName = '')
	{
		JHtmlSidebar::addEntry(
			JText::_('COM_[COMPONENT]_TITLE_[PLURAL]'),
			'index.php?option=com_[component]&view=[plural]',
			$vName == '[plural]'
		);

	}

	/**
	* Gets the files attached to an item
	*
	* @param   int     $pk     The item's id
	* @param   string  $table  The table's name
	* @param   string  $field  The field's name
	*
	* @return  array  The files
	*/
	public static function getFiles($pk, $table, $field)
	{
		$db = Factory::getDbo();
		$query = $db->getQuery(true);

		$query
		->select($field)
		->from($table)
		->where('id = ' . (int) $pk);

		$db->setQuery($query);

		return explode(',', $db->loadResult());
	}

	/**
	* Gets a list of the actions that can be performed.
	*
	* @return    JObject
	*
	* @since    1.6
	*/
	public static function getActions()
	{
		$user   = Factory::getUser();
		$result = new JObject;

		$assetName = 'com_[component]';

		$actions = array(
			'core.admin', 'core.manage', 'core.create', 'core.edit', 'core.edit.own', 'core.edit.state', 'core.delete'
		);

		foreach ($actions as $action)
		{
			$result->set($action, $user->authorise($action, $assetName));
		}

		return $result;
	}
}

