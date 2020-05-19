import React, { useState } from 'react';
// Config
import API_ROUTE from '../apiRoute';
// Third Party
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

// Static
import './Classifier.scss';
import sprite from '../assets/sprite.svg';

function Classifier() {
	const { addToast } = useToasts();

	const [state, setState] = useState({
		file: null,
		image_preview: null,
		result: null,
		image_url: null,
	});

	const handleNetworkImageInput = (e) => {
		e.preventDefault();
		e.persist();

		setState({
			image_url: e.target.value,
		});
	};

	async function handleNetworkImage(e) {
		e.preventDefault();
		e.persist();

		console.log('Handling Network Image');
		console.log('Handling Network Image');

		setState({
			image_preview: state.image_url,
		});

		try {
			console.log(state.image_url);

			const response = await axios.post(`${API_ROUTE}/networkimg/`, {
				image_url: state.image_url,
			});

			let predicted_sign = response.data.body.predicted_sign;
			setState((state) => ({
				...state,
				result: predicted_sign,
			}));
			addToast('Prediction Success', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (err) {
			console.log(err);

			addToast('Something Went Wrong, Check Your Link', {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}
	async function handleImageUpload(e) {
		e.preventDefault();
		let theFile = e.target.files[0];
		const objectUrl = URL.createObjectURL(theFile);

		setState((state) => ({
			...state,
			file: theFile,
			image_preview: objectUrl,
		}));

		const data = new FormData();
		data.append('file', theFile);
		try {
			const response = await axios.post(
				`${API_ROUTE}/classifier/`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			let predicted_sign = response.data.body.predicted_sign;
			setState((state) => ({
				...state,
				result: predicted_sign,
			}));
			addToast('Prediction Success', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (err) {
			addToast('Something went wrong with your upload', {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}
	return (
		<div className='classifier'>
			{state.image_preview && (
				<div className='preview-image'>
					<img src={state.image_preview} alt='Preview' />
				</div>
			)}
			<form
				className='classifier__form'
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<label htmlFor='image_upload' className={'u-margin-top-medium'}>
					Upload an Image
				</label>
				<label htmlFor='image_upload' className={'customFileInput'}>
					<svg className='customFileInput--icon'>
						<use xlinkHref={`${sprite}#${'icon-cloud-upload'}`} />
					</svg>
					<span>
						{state.file ? state.file.name : `Browse Image ...`}
					</span>
				</label>
				<input
					className={'u-margin-bottom-small fileInput'}
					type='file'
					placeholder='Browse Image ...'
					name='image_upload'
					id='image_upload'
					accept='image/*'
					onChange={handleImageUpload}
				/>
			</form>
			<div className='separator'>
				<p className='text text--grey text--bold'>OR</p>
			</div>
			<form className='classifier__form' onSubmit={handleNetworkImage}>
				{/* Image URL */}
				<label>Use an Image URL</label>
				<input
					className={'u-margin-bottom-small'}
					type='text'
					placeholder='Paste Image URL'
					name='imgUrl'
					onChange={handleNetworkImageInput}
				/>
			</form>
			{state.result ? (
				<div className='result u-margin-top-medium'>
					<h4 className='heading'>Result</h4>
					<p className='text'>
						That Looks like:{' '}
						<span className='text--bold'>{state.result}</span>
					</p>
				</div>
			) : null}
		</div>
	);
}

export default Classifier;
