'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HourInput = require('./TimeInput/HourInput');

var _HourInput2 = _interopRequireDefault(_HourInput);

var _MinuteInput = require('./TimeInput/MinuteInput');

var _MinuteInput2 = _interopRequireDefault(_MinuteInput);

var _SecondInput = require('./TimeInput/SecondInput');

var _SecondInput2 = _interopRequireDefault(_SecondInput);

var _NativeInput = require('./TimeInput/NativeInput');

var _NativeInput2 = _interopRequireDefault(_NativeInput);

var _dateFormatter = require('./shared/dateFormatter');

var _dates = require('./shared/dates');

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allViews = ['hour', 'minute', 'second'];

var hoursAreDifferent = function hoursAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1 !== date2 // TODO: Compare 11:22:00 and 11:22 properly
  ;
};

var findPreviousInput = function findPreviousInput(element) {
  var previousElement = element.previousElementSibling; // Divider between inputs
  if (!previousElement) {
    return null;
  }
  return previousElement.previousElementSibling; // Actual input
};

var findNextInput = function findNextInput(element) {
  var nextElement = element.nextElementSibling; // Divider between inputs
  if (!nextElement) {
    return null;
  }
  return nextElement.nextElementSibling; // Actual input
};

var selectIfPossible = function selectIfPossible(element) {
  if (!element) {
    return;
  }
  element.focus();
  element.select();
};

var removeUnwantedCharacters = function removeUnwantedCharacters(str) {
  return str.split('').filter(function (a) {
    return (
      // We don't want spaces in dates
      a.charCodeAt(0) !== 32 &&
      // Internet Explorer specific
      a.charCodeAt(0) !== 8206
    );
  }).join('');
};

var TimeInput = function (_Component) {
  _inherits(TimeInput, _Component);

  function TimeInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimeInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimeInput.__proto__ || Object.getPrototypeOf(TimeInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hour: null,
      minute: null,
      second: null
    }, _this.onKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          {
            event.preventDefault();

            var input = event.target;
            var previousInput = findPreviousInput(input);
            selectIfPossible(previousInput);
            break;
          }
        case 'ArrowRight':
        case _this.divider:
          {
            event.preventDefault();

            var _input = event.target;
            var nextInput = findNextInput(_input);
            selectIfPossible(nextInput);
            break;
          }
        default:
      }
    }, _this.onChange = function (event) {
      _this.setState(_defineProperty({}, event.target.name, parseInt(event.target.value, 10)), _this.onChangeExternal);
    }, _this.onChangeNative = function (event) {
      var value = event.target.value;


      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
    }, _this.onChangeExternal = function () {
      if (_this.props.onChange) {
        var formElements = [_this.hourInput, _this.minuteInput, _this.secondInput].filter(Boolean);

        var values = {};
        formElements.forEach(function (formElement) {
          values[formElement.name] = formElement.value;
        });

        if (formElements.every(function (formElement) {
          return formElement.value && formElement.checkValidity();
        })) {
          var timeString = ('0' + values.hour).slice(-2) + ':' + ('0' + (values.minute || 0)).slice(-2) + ':' + ('0' + (values.second || 0)).slice(-2);
          var processedValue = _this.getProcessedValue(timeString);
          _this.props.onChange(processedValue, false);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimeInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _locales.setLocale)(this.props.locale);
      this.updateValues();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      var nextValue = nextProps.value;
      var value = this.props.value;


      if (nextProps.locale !== props.locale) {
        (0, _locales.setLocale)(nextProps.locale);
      }

      if (
      // Toggling clock visibility resets values
      nextProps.isClockOpen !== props.isClockOpen || hoursAreDifferent(nextValue, value)) {
        this.updateValues(nextProps);
      }
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var nativeValueParser = this.nativeValueParser;


      return nativeValueParser(value);
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'updateValues',
    value: function updateValues() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var value = props.value;


      this.setState({
        hour: value ? (0, _dates.getHours)(value) : null,
        minute: value ? (0, _dates.getMinutes)(value) : null,
        second: value ? (0, _dates.getSeconds)(value) : null
      });
    }

    /**
     * Called when non-native date input is changed.
     */


    /**
     * Called when native date input is changed.
     */


    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */

  }, {
    key: 'renderHour',
    value: function renderHour() {
      return _react2.default.createElement(_HourInput2.default, _extends({
        key: 'hour',
        value: this.state.hour
      }, this.commonInputProps));
    }
  }, {
    key: 'renderMinute',
    value: function renderMinute() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "hour" or less

      if (allViews.indexOf(maxDetail) < 1) {
        return null;
      }

      return _react2.default.createElement(_MinuteInput2.default, _extends({
        key: 'minute',
        maxDetail: this.props.maxDetail,
        value: this.state.minute
      }, this.commonInputProps));
    }
  }, {
    key: 'renderSecond',
    value: function renderSecond() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "minute" or less

      if (allViews.indexOf(maxDetail) < 2) {
        return null;
      }

      return _react2.default.createElement(_SecondInput2.default, _extends({
        key: 'second',
        maxDetail: this.props.maxDetail,
        value: this.state.second
      }, this.commonInputProps));
    }
  }, {
    key: 'renderCustomInputs',
    value: function renderCustomInputs() {
      var _this2 = this;

      var divider = this.divider,
          dividerElement = this.dividerElement,
          placeholder = this.placeholder;


      return placeholder.split(divider).map(function (part) {
        switch (part) {
          case 'hour-24':
            return _this2.renderHour();
          case 'hour-12':
            return _this2.renderHour();
          case 'minute':
            return _this2.renderMinute();
          case 'second':
            return _this2.renderSecond();
          case 'ampm':
            return null; // TODO
          default:
            return null;
        }
      }).filter(Boolean).reduce(function (result, element, index, array) {
        result.push(element);

        if (index + 1 < array.length) {
          // eslint-disable-next-line react/no-array-index-key
          result.push(_react2.default.cloneElement(dividerElement, { key: 'separator_' + index }));
        }

        return result;
      }, []);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      return _react2.default.createElement(_NativeInput2.default, {
        key: 'time',
        maxTime: this.props.maxTime,
        minTime: this.props.minTime,
        onChange: this.onChangeNative,
        required: this.props.required,
        value: this.props.value,
        valueType: this.valueType
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-time-picker__button__input' },
        this.renderNativeInput(),
        this.renderCustomInputs()
      );
    }
  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return maxDetail;
    }
  }, {
    key: 'nativeValueParser',
    get: function get() {
      switch (this.valueType) {
        case 'hour':
        case 'minute':
          return _dates.getHoursMinutes;
        case 'second':
          return _dates.getHoursMinutesSeconds;
        default:
          throw new Error('Invalid valueType.');
      }
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'divider',
    get: function get() {
      var date = new Date(2017, 0, 1, 21, 12, 13);

      return removeUnwantedCharacters((0, _dateFormatter.formatTime)(date)).match(/[^0-9]/)[0];
    }
  }, {
    key: 'dividerElement',
    get: function get() {
      return _react2.default.createElement(
        'span',
        { className: 'react-time-picker__button__input__divider' },
        this.divider
      );
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'placeholder',
    get: function get() {
      var date = new Date(2017, 0, 1, 21, 13, 14);

      return removeUnwantedCharacters((0, _dateFormatter.formatTime)(date)).replace('21', 'hour-24').replace('9', 'hour-12').replace('13', 'minute').replace('14', 'second').replace(/AM|PM/, this.divider + 'ampm');
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this3 = this;

      return {
        maxTime: this.props.maxTime,
        minTime: this.props.minTime,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        placeholder: '--',
        // This is only for showing validity when editing
        required: this.props.required || this.props.isClockOpen,
        itemRef: function itemRef(ref) {
          if (!ref) return;

          // Save a reference to each input field
          _this3[ref.name + 'Input'] = ref;
        }
      };
    }
  }]);

  return TimeInput;
}(_react.Component);

exports.default = TimeInput;


TimeInput.defaultProps = {
  maxDetail: 'minute'
};

TimeInput.propTypes = {
  isClockOpen: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDetail: _propTypes2.default.oneOf(allViews),
  maxTime: _propTypes3.isTime,
  minTime: _propTypes3.isTime,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes3.isTime, _propTypes2.default.instanceOf(Date)])
};