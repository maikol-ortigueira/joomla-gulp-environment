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

/**
 * [Plural] list controller class.
 *
 * @since  1.6
 */
class [Component]Controller[Plural] extends [Component]Controller
{
	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    The model name. Optional.
	 * @param   string  $prefix  The class prefix. Optional
	 * @param   array   $config  Configuration array for model. Optional
	 *
	 * @return object	The model
	 *
	 * @since	1.6
	 */
	public function &getModel($name = '[Plural]', $prefix = '[Component]Model', $config = array())
	{
		$model = parent::getModel($name, $prefix, array('ignore_request' => true));

		return $model;
	}
}
