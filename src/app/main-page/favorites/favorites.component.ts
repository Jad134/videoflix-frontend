import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls:['./favorites.component.scss', './responsive-favorites.components.scss'], 
  imports: [CommonModule, MatIconModule]
})
export class FavoritesComponent {
  expandedVideoElement: HTMLVideoElement | null = null;
  expandedVideoSrc: string | null = null;
  videoService = inject(VideoService)
  videos: any[] = [];
  groupedVideos: { [key: string]: any[] } = {};
  @ViewChild('sizeVideo') sizeVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('pauseButton') pauseButton!: ElementRef<HTMLElement>;
  showPauseButton: boolean = false;
  isPlaying: boolean = false;
  fadeOutTimeout: any;
  currentVideo: any;
  hideQualitybutton = false;
  showQualitySelectButton = false;
  selectedQuality: string = 'medium';  // Set initial quality to 'medium'
  favoriteVideos: any[] = [];
  groupedFavorites: { [key: string]: any[] } = {};
  hoverTimeout: any;
  playTimeout: any;
  mouseIsNearEdge: boolean = false;


  ngOnInit(): void {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos;
      this.videoService.getFavoriteVideoIds().subscribe(favoriteIds => {
        this.favoriteVideos = this.videos.filter(video =>
          favoriteIds.includes(video.id)
        );
        console.log(this.favoriteVideos);
        this.groupFavoritesByCategory();
      });
    });
  }


   /**
   * Controls the hover effect for the video
   */
   onVideoMouseHover(video: any, videoElement: any, event: MouseEvent) {

    this.hoverTimeout = setTimeout(() => {
      this.isMouseNearEdge(event);
    }, 450); 

    this.hoverTimeout = setTimeout(() => {
      video.showInfo = true;
    }, 550); 

    this.playTimeout = setTimeout(() => {
      videoElement.play(); 
    }, 2000); 

  }

  /**
   * This function checks, if the hover from the mouse near the edge, to control
   *  the mouseIsNearEdge variable for the ngClass statemant at info-box (hover info-box screencut bug)
   * @param event mouseEvent to check the mouse coordinates
   * @param distancePx the pix number/distance from the edge to the mouse
   */
  isMouseNearEdge(event: MouseEvent, distancePx: number = 300) {
    if (window.innerWidth > 600) {
      const mouseX = event.clientX;
      const isNearLeftEdge = mouseX < distancePx;

      if (isNearLeftEdge) {
        this.mouseIsNearEdge = true
      } else {
        this.mouseIsNearEdge = false
      }
    }
  }


  onVideoMouseLeave(video: any, videoElement: any) {
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.playTimeout);
    video.showInfo = false;
    videoElement.pause();
    videoElement.currentTime = 0;
    this.updateFavoriteVideoList()
  }


   /**
   * Groups the favorite videos by their category.
   * This method organizes the videos into categories and stores them in `groupedVideos`.
   */
  groupFavoritesByCategory(): void {
    this.groupedFavorites = this.favoriteVideos.reduce((groups, video) => {
      const category = video.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(video);
      return groups;
    }, {});
  }


  /**
  * Returns an array of category names.
  * @returns the keys (categories) for the grouped videos
  */
  getCategories(): string[] {
    return Object.keys(this.groupedFavorites);
  }


  /**
  * Expands a video to show more details.
  * @param videoElement - The HTML video element to expand.
  * @param videoSrc - The source URL of the video to display.
  * @param videoData - The data object for the current video.
  */
  expandVideo(videoElement: HTMLVideoElement, videoSrc: string, videoData: any) {
    this.expandedVideoElement = videoElement;
    this.expandedVideoSrc = videoSrc;
    this.currentVideo = videoData

  }


  /**
  * Closes the expanded video view if the click is outside the video element.
  * The Favorite 
  * @param event - The mouse event triggered when clicking outside the video.
  */
  closeVideo(event: MouseEvent) {
    // Check if the click is outside the video element
    if (event.target === event.currentTarget) {
      this.expandedVideoElement = null;
      this.expandedVideoSrc = null;
      this.isPlaying = false;

      this.updateFavoriteVideoList()
    }
  }


  /**
   * Update the current showing favorite Videos
   */
  updateFavoriteVideoList(){
    this.videoService.getFavoriteVideoIds().subscribe(favoriteIds => {
      this.favoriteVideos = this.videos.filter(video =>
        favoriteIds.includes(video.id)
      );
      this.groupFavoritesByCategory();
    });
  }


  /**
  * Toggles the play or pause state of the video.
  * @param event - The event triggered by clicking the play/pause button.
  */
  togglePlay(event: Event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    const video = this.sizeVideo.nativeElement;

    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  /**
     * Handles the video click event to prevent default behavior and toggles play/pause.
     * @param event - The event triggered by clicking the video.
     */
  onVideoClick(event: Event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    this.togglePlay(event)
  }


  /**
   * Updates the play state and shows/hides the pause button based on video playback.
   */
  onPlay() {
    this.isPlaying = true; 
    this.showPauseButton = true;
    clearTimeout(this.fadeOutTimeout);
    this.fadeOutTimeout = setTimeout(() => {
      this.showPauseButton = false; 
    }, 3000);
  }


  /**
   * Updates the pause state and hides the pause button.
   */
  onPause() {
    this.isPlaying = false; 
    this.showPauseButton = false;

  }


  /**
   * Slides out the quality control button with a delay.
   */
  slideOutButton() {
    this.hideQualitybutton = true;
    setTimeout(() => {
      this.showQualitySelectButton = true;
    }, 500); 
  }


  /**
   * Changes the video quality based on the selected option.
   * @param quality - The selected quality setting ('low', 'medium', 'high').
   */
  changeVideoQuality(quality: any) {
    this.selectedQuality = quality;

    if (quality === 'low') {
      this.expandedVideoSrc = this.currentVideo.video_480p
      this.timerForControlQualityButtons()
    } else if (quality === 'medium') {
      this.expandedVideoSrc = this.currentVideo.video_file
      this.timerForControlQualityButtons()
    } else if (quality === 'high') {
      this.expandedVideoSrc = this.currentVideo.video_720p
      this.timerForControlQualityButtons()
    }
  }


/**
  * Checks if the given quality is the currently selected one.
  * @param quality - The quality setting to check.
  * @returns true if the quality is selected, otherwise false.
  */
  isActiveQuality(quality: string): boolean {
    return this.selectedQuality === quality;
  }


  /**
  * Sets a timer to hide the quality control buttons after a delay.
  */
  timerForControlQualityButtons() {
    setTimeout(() => {
      this.hideQualitybutton = false
      this.showQualitySelectButton = false
    }, 1500);
  }


   /**
  * Adds the current video to the user's favorites by calling the toggleFavorite method in the video service.
  */
   addFav() {
    this.videoService.toggleFavorite(this.currentVideo.id).subscribe(() => {
      this.videoService.getFavoriteVideoIds().subscribe(favoriteIds => {
        this.videoService.favoriteVideos = this.videos.filter(video =>
          favoriteIds.includes(video.id)
        );
        this.isFavorite(this.currentVideo.id);
      });
    });
    this.triggerAnimation();
  }


  isFavorite(videoId: number): boolean {
    return this.videoService.favoriteVideos.some(video => video.id === videoId);
  }


   /**
   * Triggers the pop animation of the likebutton
   */
   triggerAnimation() {
    const element = document.querySelector('.favorite-icon');
    if (element) {
      element.classList.add('animate');
      setTimeout(() => {
        element.classList.remove('animate');
      }, 300); // Duration of the animation in milliseconds
    }
  }

   /**
 * Adds the current hovered infobox video to the user's favorites by calling the toggleFavorite method in the video service.
 */
   addFavfromHoverBox(id: any) {
    this.videoService.toggleFavorite(id).subscribe(() => {
      this.videoService.getFavoriteVideoIds().subscribe(favoriteIds => {
        this.videoService.favoriteVideos = this.videos.filter(video =>
          favoriteIds.includes(video.id)
        );
        this.isFavorite(id);
      });
    });
    this.triggerHoveredVideoFavIcon()
  }

  triggerHoveredVideoFavIcon() {
    const infoBoxElements = document.querySelectorAll('.favorite-icon-infobox');

    infoBoxElements.forEach(infoBoxElement => {
      infoBoxElement.classList.add('animate');
      setTimeout(() => {
        infoBoxElement.classList.remove('animate');
      }, 300); // Dauer der Animation in Millisekunden
    });
  }

}
