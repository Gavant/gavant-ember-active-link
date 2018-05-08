import LinkComponent from '@ember/routing/link-component';
import layout from '../../templates/components/active-link/link-to';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { tryInvoke } from '@ember/utils';

export default LinkComponent.extend({
    layout,
    init() {
        this._super(...arguments);
        scheduleOnce('afterRender', this, 'registerWithParent');
    },

    registerWithParent() {
        const container = get(this, 'container') || {};
        tryInvoke(container, 'registerChild', [this]);
    }
});
