import Container from 'maduser-container/src/Container';
import Hello from './components/Hello';

const App = new Container({
	components: {
		Hello: {
			class: Hello,
			selector: 'body',
			options: {
				message: 'Hello!'
			}
		},
	}
});

document.addEventListener('DOMContentLoaded', function() {
	App.initAll();
}, false);
