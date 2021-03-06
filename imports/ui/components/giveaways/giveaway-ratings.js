import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import { voteUp, voteDown, unvote } from '../../../api/ratings/methods';

const makeVoteClickHandler = (isUpvote, ownVote, gaId) => {
  return event => {
    if (!Meteor.userId()) return;

    let method = ownVote === isUpvote ? unvote : isUpvote ? voteUp : voteDown;
    method.call({ userId: Meteor.userId(), giveawayId: gaId });
  };
};

export const GiveawayRatings = ({ gaId, upvotes, downvotes, ownVote }) => (
  <div className="giveaway-ratings">
    <Grid>
      <Row>
        <Col xs={3}>
          <IconButton className="button-upvote" className={ ownVote === true ? "voted" : "" } onTouchTap={ makeVoteClickHandler(true, ownVote, gaId) }>
            <FontIcon className="material-icons">thumb_up</FontIcon>
          </IconButton>
        </Col>
        <Col xs={3}>
          <span className="num_ratings">{ upvotes }</span>
        </Col>
        <Col xs={3}>
          <IconButton className="button-downvote" className={ ownVote === false ? "voted" : "" } onTouchTap={ makeVoteClickHandler(false, ownVote, gaId) }>
            <FontIcon className="material-icons">thumb_down</FontIcon>
          </IconButton>
        </Col>
        <Col xs={3}>
          <span className="num_ratings">{ downvotes }</span>
        </Col>
      </Row>
    </Grid>
  </div>
);
