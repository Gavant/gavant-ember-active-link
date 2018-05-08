import Component from '@ember/component';
import layout from '../templates/components/active-link';
import { get, set, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';

const transitioningInClass  = 'ember-transitioning-in';
const transitioningOutClass = 'ember-transitioning-out';

export default Component.extend({
    layout,
    tagName: 'li',
    classNameBindings: ['active', 'disabled', 'isTransitioningIn', 'isTransitioningOut'],

    activeClass: computed('childLinks.@each.active', function(){
        let activeLink = get(this, 'childLinks').findBy('active');
        return (activeLink ? get(activeLink, 'active') : 'active');
    }),

    disabledClass: computed('childLinks.@each.disabled', function(){
        let disabledLink = get(this, 'childLinks').findBy('disabled');
        return (disabledLink ? get(disabledLink, 'disabled') : 'disabled');
    }),

    active: computed('hasActiveLinks', 'activeClass', function() {
        return get(this, 'hasActiveLinks') ? get(this, 'activeClass') : false;
    }),

    disabled: computed('allLinksDisabled', 'disabledClass', function() {
        return get(this, 'allLinksDisabled') ? get(this, 'disabledClass') : false;
    }),

    isTransitioningIn: computed('childLinks.@each.transitioningIn', function(){
        if(get(this, 'childLinks').isAny('transitioningIn')) {
            return transitioningInClass;
        }
    }),

    isTransitioningOut: computed('childLinks.@each.transitioningOut', function(){
        if(get(this, 'childLinks').isAny('transitioningOut')) {
            return transitioningOutClass;
        }
    }),

    hasActiveLinks: computed('childLinks.@each.active', function() {
        return get(this, 'childLinks').isAny('active');
    }),

    allLinksDisabled: computed('childLinks.@each.disabled', function() {
        return !isEmpty(get(this, 'childLinks')) && get(this, 'childLinks').isEvery('disabled');
    }),

    init() {
        this._super(...arguments);
        set(this, 'childLinks', A([]));
    },

    registerChild(view) {
        get(this, 'childLinks').pushObject(view);
    }
});
