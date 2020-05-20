import React from 'react';
import Classifier from './components/Classifier';

// Third Party
import { ToastProvider } from 'react-toast-notifications';

function Home() {
	return (
		<ToastProvider>
			<div className='home'>
				<div className='jumbotron'>
					<h1 className='heading heading--main text--white'>
						Traffic Sign Classifier
					</h1>
					<h4 className='text text--white'>
						Tip: Try Give Some Clear Images
					</h4>
					<h4 className='text text--white'>
						The Model was trained using a German traffic signs
						dataset of select 42 different traffic signs in Germany.
					</h4>
					<h4 className='text text--white'>
						Note: The backend is powered by a free heroku dyno which
						sleeps often and takes time to boot
					</h4>
				</div>
				<Classifier />
				<div className='footer'>
					<p className='text text--grey'>
						The Model Accuracy score against test data is:{' '}
						<span className='text--bold'>0.97537</span>
					</p>
					<p className='text text--grey'>
						You can extend this model's perfomance with more
						datasets for better prediction accuracy.
					</p>
					<p className='text text--grey'>
						The Training Source code is available here:{' '}
						<a
							href={`https://github.com/ItsCosmas/Traffic-Sign-Classification`}
							rel='noopener noreferrer'>
							https://github.com/ItsCosmas/Traffic-Sign-Classification
						</a>
					</p>
					<p className='text text--grey'>
						The Deployment source code for this page and the backend
						is available here:{' '}
						<a
							href={`https://github.com/ItsCosmas/traffic-signs-classifier`}
							rel='noopener noreferrer'>
							Open Source
						</a>
					</p>
					<p className='text text--grey'>
						<a
							href={`https://itscosmas.me`}
							target={'_blank'}
							rel='noopener noreferrer'>
							&copy; Cosmas Gikunju
						</a>
					</p>
				</div>
			</div>
		</ToastProvider>
	);
}

export default Home;
