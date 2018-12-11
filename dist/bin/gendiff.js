#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import print from '..';
_commander.default.version('0.0.1').description('Compares two configuration files and shows a difference.').option('-f, --format [type]', 'output format').arguments('<firstConfig> <secondConfig>'); // .action((first, second) => (print(first, second)));


_commander.default.parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2VuZGlmZi5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwidmVyc2lvbiIsImRlc2NyaXB0aW9uIiwib3B0aW9uIiwiYXJndW1lbnRzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOzs7O0FBQ0E7QUFFQUEsbUJBQ0dDLE9BREgsQ0FDVyxPQURYLEVBRUdDLFdBRkgsQ0FFZSwwREFGZixFQUdHQyxNQUhILENBR1UscUJBSFYsRUFHaUMsZUFIakMsRUFJR0MsU0FKSCxDQUlhLDhCQUpiLEUsQ0FLQTs7O0FBRUFKLG1CQUFRSyxLQUFSLENBQWNDLE9BQU8sQ0FBQ0MsSUFBdEIiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG4vLyBpbXBvcnQgcHJpbnQgZnJvbSAnLi4nO1xuXG5wcm9ncmFtXG4gIC52ZXJzaW9uKCcwLjAuMScpXG4gIC5kZXNjcmlwdGlvbignQ29tcGFyZXMgdHdvIGNvbmZpZ3VyYXRpb24gZmlsZXMgYW5kIHNob3dzIGEgZGlmZmVyZW5jZS4nKVxuICAub3B0aW9uKCctZiwgLS1mb3JtYXQgW3R5cGVdJywgJ291dHB1dCBmb3JtYXQnKVxuICAuYXJndW1lbnRzKCc8Zmlyc3RDb25maWc+IDxzZWNvbmRDb25maWc+Jyk7XG4vLyAuYWN0aW9uKChmaXJzdCwgc2Vjb25kKSA9PiAocHJpbnQoZmlyc3QsIHNlY29uZCkpKTtcblxucHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuIl19