'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HourInput = function (_PureComponent) {
  _inherits(HourInput, _PureComponent);

  function HourInput() {
    _classCallCheck(this, HourInput);

    return _possibleConstructorReturn(this, (HourInput.__proto__ || Object.getPrototypeOf(HourInput)).apply(this, arguments));
  }

  _createClass(HourInput, [{
    key: 'render',
    value: function render() {
      var maxHour = this.maxHour,
          minHour = this.minHour;
      var _props = this.props,
          itemRef = _props.itemRef,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          required = _props.required,
          value = _props.value;


      return _react2.default.createElement('input', {
        className: 'react-time-picker__button__input__hour',
        name: 'hour',
        max: maxHour,
        min: minHour,
        onChange: onChange,
        onKeyDown: onKeyDown,
        placeholder: '--',
        ref: function ref(_ref) {
          if (!_ref) return;

          (0, _utils.updateInputWidth)(_ref);

          if (itemRef) {
            itemRef(_ref);
          }
        },
        required: required,
        type: 'number',
        value: value !== null ? value : ''
      });
    }
  }, {
    key: 'maxHour',
    get: function get() {
      var maxTime = this.props.maxTime;

      return (0, _utils.min)(23, maxTime && (0, _dates.getHours)(maxTime));
    }
  }, {
    key: 'minHour',
    get: function get() {
      var minTime = this.props.minTime;

      return (0, _utils.max)(0, minTime && (0, _dates.getHours)(minTime));
    }
  }]);

  return HourInput;
}(_react.PureComponent);

exports.default = HourInput;


HourInput.propTypes = {
  itemRef: _propTypes2.default.func,
  maxTime: _propTypes3.isTime,
  minTime: _propTypes3.isTime,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  value: _propTypes2.default.number
};