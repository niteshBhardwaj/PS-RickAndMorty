import mongoose from 'mongoose';
import '../config';

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

export default function connect() {
	
	return (
		mongoose.connect(process.env.MONGODB_URL, {
					useNewUrlParser: true,
					useUnifiedTopology: true
		})
		.then(() => {
			console.log('datatbase connected!');
		})
		.catch((e) => {
			console.log("database connection failed", e.name)
			process.exit();
		})
	)

}

