
/*!
 * pagemaster
 * Copyright(c) 2011 Matt Mueller <mattmuelle@gmail.com>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.1';

module.exports = function(input, output, pages) {
  pages = parseInt(pages, 10);

  var layout = [],
      mod = pages % 4,
      blanks = (mod) ? 4 - mod : 0,
      total = pages + blanks,
      flip = false;

  // Do one side
  for(var i = 1, j = 2; j <= total; i++, j = j+2) {
    layout[j] = 'A' + i;
    layout[j] += (flip) ? 'S' : '';
    layout[j] = (i > pages) ? 'B1' : layout[j];

    flip = !flip;
  }

  // Now do the other side
  for(i + 1, j = j - 3; j > 0; i++, j=j-2) {
    layout[j] = 'A' + i;
    layout[j] += (flip) ? '' : 'S';
    layout[j] = (i > pages) ? 'B1' : layout[j];

    flip = !flip;
  }

  // Build the command
  var command = 'pdftk A="' + input + '"';
  command += ' B="' + __dirname + '/../blank.pdf" cat';
  command += layout.join(' ');
  command += ' output ' + output;

  return command;
};