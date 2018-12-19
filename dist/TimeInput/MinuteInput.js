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

var MinuteInput = function (_PureComponent) {
  _inherits(MinuteInput, _PureComponent);

  function MinuteInput() {
    _classCallCheck(this, MinuteInput);

    return _possibleConstructorReturn(this, (MinuteInput.__proto__ || Object.getPrototypeOf(MinuteInput)).apply(this, arguments));
  }

  _createClass(MinuteInput, [{
    key: 'render',
    value: function render() {
      var maxMinute = this.maxMinute,
          minMinute = this.minMinute;
      var _props = this.props,
          itemRef = _props.itemRef,
          onChange = _props.onChange,
          onKeyDown = _props.onKeyDown,
          required = _props.required,
          value = _props.value;


      return _react2.default.createElement('input', {
        className: 'react-time-picker__button__input__minute',
        name: 'minute',
        max: maxMinute,
        min: minMinute,
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
    key: 'maxMinute',
    get: function get() {
      var _props2 = this.props,
          hour = _props2.hour,
          maxTime = _props2.maxTime;

      return (0, _utils.min)(59, maxTime && hour === (0, _dates.getHours)(maxTime) && (0, _dates.getMinutes)(maxTime));
    }
  }, {
    key: 'minMinute',
    get: function get() {
      var _props3 = this.props,
          hour = _props3.hour,
          minTime = _props3.minTime;

      return (0, _utils.max)(0, minTime && hour === (0, _dates.getHours)(minTime) && (0, _dates.getMinutes)(minTime));
    }
  }]);

  return MinuteInput;
}(_react.PureComponent);

exports.default = MinuteInput;


MinuteInput.propTypes = {
  hour: _propTypes2.default.number,
  itemRef: _propTypes2.default.func,
  maxTime: _propTypes3.isTime,
  minTime: _propTypes3.isTime,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  value: _propTypes2.default.number
};