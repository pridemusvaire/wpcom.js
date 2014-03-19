
/**
 * Module dependencies.
 */

var Action = require('./action');
var req = require('./req');
var debug = require('debug')('wp-connect:site');

/**
 * Create a Site instance
 *
 * @param {Site} wpconn
 * @api public
 */

function Site(wpconn){
  if (!(this instanceof Site)) return new Site(wpconn);
  this.wpconn = wpconn;

  // post methods
  this.post = new Action('post', this.wpconn);
}

/**
 * Set site identifier
 *
 * @api public
 */

Site.prototype.setId = function(id){
  debug('set `%s` site id', id);
  this.id = id;
};

/**
 * require site data
 *
 * @api public
 */

Site.prototype.info = function(opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  opts = opts || {};

  if (!this.id) {
    return fn(new Error('site id is not defined'));
  }

  req('site', { site: this.id }, opts, fn);
};

/**
 * Expose `Site` module
 */

module.exports = Site;