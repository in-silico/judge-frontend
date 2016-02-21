var React = require('react');
var superAgent = require('superagent');

class ProblemElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem_id: this.props.problem.problem_id,
      problem_name: this.props.problem.title,
      problem_category: this.props.problem.category
    };
  }

  render() {
    return (
      <tr>
        <td>{this.state.problem_id}</td>
        <td>{this.state.problem_name}</td>
        <td>{this.state.problem_category}</td>
      </tr>
    );
  }
}

module.exports = class ProblemsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: []
    };
  }

  componentWillMount() {
    superAgent
      .get(this.props.url + "/data/problems")
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err)
          console.log('Oh no! error');
        else {
          this.setState({problems: JSON.parse(res.text)});
        }
      });
  }

  render() {
    console.log(this.state.problems);
    var problems = this.state.problems.map((item) => {
      return <ProblemElement problem={item} />
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {problems}
        </tbody>
      </table>
    );
  }
}
