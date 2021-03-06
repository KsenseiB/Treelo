import { Popover } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import React, { Component } from 'react'


export class CoverSelector extends Component {

    state = {
        cover: null
    }

    componentDidMount() {
        this.setCoverFromProps()
    }

    setCoverFromProps = () => {
        let cover = this.props.card.cover
        if (!cover) cover = { id: null, value: null }
        this.setState({ cover })
    }

    colors = [
        { id: 101, value: '#cd9fcb' },
        { id: 102, value: '#a7ead1' },
        { id: 103, value: '#ffb787' },
        { id: 104, value: '#f6c1d2' },
        { id: 105, value: '#fd7967' },
        { id: 106, value: '#8f79a8' },
        { id: 107, value: '#b5daf6' },
        { id: 108, value: '#a7a7a7' },
        { id: 109, value: '#ab8597' },
    ]

    onSelectCover = async (value) => {

        let cover = {
            id: value.id,
            color: value.value,
            src: value.src
        }

        this.setState({ cover },
            this.props.onUpdate(cover))
    }

    onRemoveCover = () => {
        this.setState({ cover: null }, () => {
            console.log(this.state.cover)
            this.props.onUpdate(this.state.cover)
        })
    }

    getImageEls = () => {
        const att = this.props.card.attachments

        if (!att)
            return <React.Fragment />
        const imageEls = att.map(el => {
            let txt = "single-image-choice"
            if (this.state.cover.id === el.id) {
                txt += ' selected'
            }
            return <div key={el.id} className={txt} onClick={() => this.onSelectCover(el)} style={{ backgroundImage: `url(${el.src})` }}></div>
        })

        return <React.Fragment><h6>Images</h6><div className="image-choice">{imageEls}</div></React.Fragment>
    }

    getColorEls = () => {
        const colorEls = this.colors.map(el => {
            let txt = "color-choice"
            if (this.state.cover.id === el.id) {
                txt += ' selected'
            }

            return <div key={el.id} className={txt} onClick={() => this.onSelectCover(el)} style={{ backgroundColor: el.value }}></div>
        })
        return colorEls
    }

    render() {
        if (!this.state.cover) return <React.Fragment />
        return (
            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={true}
                anchorEl={this.props.anchorEl.current}
                onClose={this.props.toggleList}
                onBackdropClick={this.props.toggleList}
            >
                <div className="cover-selector-container">
                    <div className="cover-selector-header flex justify-center">
                        <h5>Cover</h5>
                        <CloseOutlined className="close-cover-modal" onClick={this.props.toggleList} />
                    </div>
                    <div className="cover-selector-colors">
                        <h6>Colors</h6>
                        <div className="color-selection">
                            {this.getColorEls()}
                        </div>
                    </div>
                    <div className="cover-selector-images">
                        {this.getImageEls()}
                    </div>
                    <div className="cover-remove-container">
                        <button className="cancel-btn" onClick={this.onRemoveCover}>Remove Cover</button>
                    </div>
                </div>
            </Popover>

        )
    }
}
