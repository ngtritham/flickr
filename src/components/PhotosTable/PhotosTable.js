import React, { Component } from 'react';
import axios from 'axios';
import Gallery from 'react-grid-gallery';
import InfiniteScroller from 'react-infinite-scroller';

import config from '../../configs/config';

class PhotosTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            frame: 0
        };
    }

    componentWillMount() {
        this.fetchPhoto();
    }

    loadPhoto() {
        let photos = [];
        let frame = null;

        this.state.photos.forEach(photo => {
            frame = {
                src: photo.url,
                thumbnail: photo.url,
                thumbnailWidth: 250,
                thumbnailHeight: 200,
                caption: photo.title + '\n' + photo.owner + '\n' + photo.views
            }
            photos.push(frame);
        })

        return photos;
    }

    fetchPhoto() {
        let url_api = `https://api.flickr.com/services/rest/?method=${config.method.getList}&api_key=${config.api_key}&per_page=500&page=1&format=json&nojsoncallback=1&extras=views`;
        axios.get(url_api)
            .then(res => {
                let photoList = res.data.photos.photo;
                let photos = this.state.photos;
                let photo = null;
                let frame = this.state.frame;
                let index = null;

                for(let i = 0; i < 20; i++) {
                    index = frame * 20 + i;

                    photo = {
                        url: `https://farm${photoList[index].farm}.staticflickr.com/${photoList[index].server}/${photoList[index].id}_${photoList[index].secret}.jpg`,
                        owner: photoList[index].owner,
                        title: photoList[index].title,
                        views: photoList[index].views
                    }
                    photos.push(photo);
                }

                console.log(index)

                this.setState({
                    photos: photos,
                    frame: ++this.state.frame
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const photos = this.loadPhoto();
        const loader = <h4 className="loader">Loading...</h4>;

        return (
            <div class="container">
                <div class="portfolio-page">
                    <InfiniteScroller
                        pageStart={0}
                        loadMore={this.fetchPhoto.bind(this)}
                        hasMore={true}
                        loader={loader}
                    >
                        <Gallery images={photos}/>
                    </InfiniteScroller>
                </div>
            </div>
        )
    }
}

export default PhotosTable;