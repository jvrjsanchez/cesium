/*global define*/
define([
    './Cartesian3',
    './defaultValue',
    './defineProperties',
    './Matrix4'
], function(
    Cartesian3,
    defaultValue,
    defineProperties,
    Matrix4) {
    'use strict';

    /**
     * DOC_TBA
     *
     * @alias DistanceDisplayCondition
     * @constructor
     */
    function DistanceDisplayCondition(near, far) {
        near = defaultValue(near, 0.0);
        this._near = near;
        this._near2 = near * near;

        far = defaultValue(far, Number.MAX_VALUE);
        this._far = far;
        this._far2 = far * far;
    }

    defineProperties(DistanceDisplayCondition.prototype, {
        /**
         * DOC_TBA
         * @memberof DistanceDisplayCondition.prototype
         * @type {Number}
         */
        near : {
            get : function() {
                return this._near;
            },
            set : function(value) {
                this._near = value;
                this._near2 = value * value;
            }
        },
        /**
         * DOC_TBA
         * @memberof DistanceDisplayCondition.prototype
         * @type {Number}
         */
        far : {
            get : function() {
                return this._far;
            },
            set : function(value) {
                this._far = value;
                this._far2 = value * value;
            }
        }
    });

    var scratchPosition = new Cartesian3();

    /**
     * DOC_TBA
     */
    DistanceDisplayCondition.prototype.isVisible = function(primitive, frameState) {
        // TODO: need to consider positions, e.g., for a polyline

        // Distance to center of primitive's reference frame
        var position = Matrix4.getTranslation(primitive.modelMatrix, scratchPosition);
        var distance2 = Cartesian3.distanceSquared(position, frameState.camera.positionWC);
        return (distance2 >= this._near2) && (distance2 <= this._far2);
    };

    return DistanceDisplayCondition;
});