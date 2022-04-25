/** @odoo-module **/

import { NewContentModal, MODULE_STATUS } from '@website/systray_items/new_content';
import { patch } from 'web.utils';

patch(NewContentModal.prototype, 'website_slides_new_content', {
    setup() {
        this._super();

        const newSlidesChannelElement = this.state.newContentElements.find(element => element.moduleXmlId === 'base.module_website_slides');
        newSlidesChannelElement.createNewContent = () => this.createNewSlidesChannel();
        newSlidesChannelElement.status = MODULE_STATUS.INSTALLED;
    },

    createNewSlidesChannel() {
        this.action.doAction('website_slides.slide_channel_action_add', {
            onClose: (data) => {
                if (data) {
                    this.website.goToWebsite({path: data.path});
                }
            },
        });
    }
});
