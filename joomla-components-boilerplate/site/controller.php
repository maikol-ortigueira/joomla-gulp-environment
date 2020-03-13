<?php
/**
* @version    [version]
* @package    Com_[Component]
* @author     [author] <[authorEmail]>
* @copyright  [copyright]
* @license    [license]
*/

use \Joomla\CMS\MVC\Controller\BaseController;

// No direct access
defined('_JEXEC') or die;

use \Joomla\CMS\Factory;

/**
 * Class [Component]Controller
 *
 * @since  1.6
 */
class [Component]Controller extends BaseController
{
	/**
	 * Method to display a view.
	 *
	 * @param   boolean $cachable  If true, the view output will be cached
	 * @param   mixed   $urlparams An array of safe url parameters and their variable types, for valid values see {@link JFilterInput::clean()}.
	 *
	 * @return  JController   This object to support chaining.
	 *
	 * @since    1.5
     * @throws Exception
	 */
	public function display($cachable = false, $urlparams = false)
	{
        $app  = Factory::getApplication();
        $view = $app->input->getCmd('view', '[plural]');
		$app->input->set('view', $view);

		parent::display($cachable, $urlparams);

		return $this;
	}
}
