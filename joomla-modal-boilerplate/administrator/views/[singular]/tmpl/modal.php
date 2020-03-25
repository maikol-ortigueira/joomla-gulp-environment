<?php
/**
* @version    [version]
* @package    Com_[Component]
* @author     [author] <[authorEmail]>
* @copyright  [copyright]
* @license    [license]
*/

defined('_JEXEC') or die;

JHtml::_('bootstrap.tooltip', '.hasTooltip', array('placement' => 'bottom'));

// @deprecated 4.0 the function parameter, the inline js and the buttons are not needed since 3.7.0.
$function  = JFactory::getApplication()->input->getCmd('function', 'jEdit[Singular]_' . (int) $this->item->id);

// Function to update input title when changed
JFactory::getDocument()->addScriptDeclaration('
	function jEdit[Singular]Modal() {
		if (window.parent && document.formvalidator.isValid(document.getElementById("item-form"))) {
			return window.parent.' . $this->escape($function) . '(document.getElementById("jform_title").value);
		}
	}
');
?>
<button id="applyBtn" type="button" class="hidden" onclick="Joomla.submitbutton('[singular].apply'); jEdit[Singular]Modal();"></button>
<button id="saveBtn" type="button" class="hidden" onclick="Joomla.submitbutton('[singular].save'); jEdit[Singular]Modal();"></button>
<button id="closeBtn" type="button" class="hidden" onclick="Joomla.submitbutton('[singular].cancel');"></button>

<div class="container-popup">
	<?php $this->setLayout('edit'); ?>
	<?php echo $this->loadTemplate(); ?>
</div>
