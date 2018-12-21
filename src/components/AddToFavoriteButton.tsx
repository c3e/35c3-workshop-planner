import { Dispatch } from 'redux';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import WorkshopEvent from '../dataobjects/WorkshopEvent';
import WorkshopFavorite from '../dataobjects/WorkshopFavorite';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { newWorkshopFavoriteAdded, workshopFavoriteRemoved } from '../store/global/actions';

interface IAddToFavoriteButtonProps {
  dispatch: Dispatch;
  currentWorkshop: WorkshopSession;
  currentEvent: WorkshopEvent;
  favorites: WorkshopFavorite[];
}

interface IAddToFavoriteButtonState {}

class AddToFavoriteButton extends React.Component<IAddToFavoriteButtonProps, IAddToFavoriteButtonState> {

  constructor(props: any) {
    super(props);
  }

  private isInFavoriteList(currentFav: WorkshopFavorite): boolean {
    return this.props.favorites.find((fav) => fav.equals(currentFav)) !== undefined;
  }

  render(): any {
    const currentFav = new WorkshopFavorite(this.props.currentWorkshop, this.props.currentEvent);

    return (
      <View style={styles.iconContainer}>
        { this.isInFavoriteList(currentFav) ?
          (<MaterialCommunityIcons
            name={'bookmark-minus'}
            size={32}
            color={ Colors.removeFromFavorite }
            style={ styles.iconAddToFav}
            onPress={() => this.props.dispatch(workshopFavoriteRemoved(currentFav))}
          />) :
          (<MaterialCommunityIcons
              name={'bookmark-plus'}
              size={32}
              color={ Colors.addToFavorite }
              style={ styles.iconAddToFav}
              onPress={() => this.props.dispatch(newWorkshopFavoriteAdded(currentFav))}
          />)
        }
      </View>
    );
  }
}

const mapStateToProps = ({ global }: ApplicationState) => ({
  currentWorkshop: global.currentWorkshop,
  currentEvent: global.currentEvent,
  favorites: global.favorites
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavoriteButton);

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconAddToFav: {
    paddingRight: 10,
    paddingLeft: 10
  },
  iconAddToCalender: {
    paddingRight: 10,
    paddingLeft: 10
  }
});
