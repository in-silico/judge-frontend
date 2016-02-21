var React = require('react');
var katex = require('katex');
var marked = require('marked');

module.exports = React.createClass({
  rawHTML: function () {
    var test = "'\\Sigma_{\\frac{3}{4}}' __text__";
    var list = test.split("'");
    list.forEach(function (item, index) {
      if (index % 2 != 0)
        test = test.replace("'" + item + "'", katex.renderToString(item));
    });
    test = marked(test);
    return {__html: marked(test)};
  },
  render: function () {
    return (
      <div className="Contest">
        <span dangerouslySetInnerHTML={this.rawHTML()}></span>
      </div>
    );
  }
});
