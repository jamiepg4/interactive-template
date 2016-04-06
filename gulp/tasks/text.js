var gulp        = require('gulp');
var utils       = require('gulp-util');
var fs          = require('fs');
var htmlparser  = require('htmlparser2');
var url         = require('url');
var archieml    = require('archieml');
var Entities    = require('html-entities').AllHtmlEntities;
var p           = require('../../package.json');
var request     = require('google-oauth-jwt').requestWithJWT();

gulp.task('text', function() {
	utils.log('Downloading text from Google Document:', utils.colors.magenta(p.document));
    return request({
        url: 'https://docs.google.com/feeds/download/documents/export/Export?id=' + p.document + '&exportFormat=html',
        jwt: {
            email: 'text-fetcher@fusion-static.iam.gserviceaccount.com',
            keyFile: 'key/google.pem',
            scopes: [
                'https://www.googleapis.com/auth/drive.readonly'
            ]
        }
    }, function (err, res, body) {
          var handler = new htmlparser.DomHandler(function(error, dom) {
            var tagHandlers = {
              _base: function (tag) {
                var str = '';
                tag.children.forEach(function(child) {
                  if (func = tagHandlers[child.name || child.type]) str += func(child);
                });
                return str;
              },
              text: function (textTag) { 
                return textTag.data; 
              },
              span: function (spanTag) {
                return tagHandlers._base(spanTag);
              },
              p: function (pTag) { 
                return tagHandlers._base(pTag) + '\n'; 
              },
              a: function (aTag) {
                var href = aTag.attribs.href;
                if (href === undefined) return '';

                // extract real URLs from Google's tracking
                // from: http://www.google.com/url?q=http%3A%2F%2Fwww.nytimes.com...
                // to: http://www.nytimes.com...
                if (aTag.attribs.href && url.parse(aTag.attribs.href,true).query && url.parse(aTag.attribs.href,true).query.q) {
                  href = url.parse(aTag.attribs.href,true).query.q;
                }

                var str = '<a href="' + href + '">';
                str += tagHandlers._base(aTag);
                str += '</a>';
                return str;
              },
              li: function (tag) {
                return '* ' + tagHandlers._base(tag) + '\n';
              }
            };

            ['ul', 'ol'].forEach(function(tag) {
              tagHandlers[tag] = tagHandlers.span;
            });
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function(tag) {
              tagHandlers[tag] = tagHandlers.p;
            });

            var body = dom[0].children[1];
            var parsedText = tagHandlers._base(body);

            // Convert html entities into the characters as they exist in the google doc
            var entities = new Entities();
            parsedText = entities.decode(parsedText);

            // Remove smart quotes from inside tags
            parsedText = parsedText.replace(/<[^<>]*>/g, function(match){
              return match.replace(/”|“/g, '"').replace(/‘|’/g, "'");
            });

            var parsed = archieml.load(parsedText);

            utils.log('Saving text into JSON document', utils.colors.magenta(p.document));
            fs.writeFile('text.json', JSON.stringify(parsed, null, 2));
          });

        var parser = new htmlparser.Parser(handler);
        parser.write(body);
        parser.done();
    });
});