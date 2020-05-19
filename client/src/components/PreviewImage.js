import React from 'react';

// Static
import preview_img from './images.jpeg';

function PreviewImage() {
	return (
		<div className='preview-image'>
			<img src={preview_img} alt='Preview' />
		</div>
	);
}

export default PreviewImage;
