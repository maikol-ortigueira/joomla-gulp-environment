<?php
/**
* @version    [version]
* @package    Com_[Component]
* @author     [author] <[authorEmail]>
* @copyright  [copyright]
* @license    [license]
*/

use \Joomla\Utilities\ArrayHelper;
use \Joomla\CMS\Language\Text;

// No direct access
defined('_JEXEC') or die;

/**
* [Component] Listhelper.
*
* @since  1.6
*/
abstract class JHtmlListhelper
{
	static function toggle($value = 0, $view, $field, $i)
	{
		$states = array(
			0 => array('icon-remove', Text::_('Toggle'), 'inactive btn-danger'),
			1 => array('icon-checkmark', Text::_('Toggle'), 'active btn-success')
		);

		$state  = ArrayHelper::getValue($states, (int) $value, $states[0]);
		$text   = '<span aria-hidden="true" class="' . $state[0] . '"></span>';
		$html   = '<a href="#" class="btn btn-micro ' . $state[2] . '"';
		$html  .= 'onclick="return toggleField(\'cb'.$i.'\',\'' . $view . '.toggle\',\'' . $field . '\')" title="' . Text::_($state[1]) . '">' . $text . '</a>';

		return $html;
	}
}
