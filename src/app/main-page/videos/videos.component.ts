import { Component, ElementRef, HostListener, OnInit, ViewChild, inject, } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss', './responsive-videos.components.scss'],
})
export class VideosComponent {
constructor(private router: Router){}

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
  hoverTimeout: any;
  playTimeout: any;
  mouseIsNearEdge: boolean = false;

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.videos = data;
      this.groupVideosByCategory();
      
    });

    this.videoService.getFavoriteVideoIds().subscribe(favoriteIds => {
      // Filtert nur die Videos, die in den Favoriten sind
      this.videoService.favoriteVideos = this.videos.filter(video =>
        favoriteIds.includes(video.id),
      );
    })

    // const userData = localStorage.getItem('userData');
    // if (userData) {
    //   console.log('Logged in user data:', JSON.parse(userData));
    // }
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


  /**
   * close the hovered video and stops the preview video
   */
  onVideoMouseLeave(video: any, videoElement: any) {
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.playTimeout);
    video.showInfo = false;
    videoElement.pause();
    videoElement.currentTime = 0;
  }

  /**
   * Groups the videos by their category.
   * This method organizes the videos into categories and stores them in `groupedVideos`.
  */
  groupVideosByCategory(): void {
    this.groupedVideos = this.videos.reduce((groups, video) => {
      const category = video.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(video);
      //console.log(groups);
      return groups;
    }, {});
  }


  /**
   * Returns an array of category names.
   * @returns the keys (categories) for the grouped videos
   */
  getCategories(): string[] {
    return Object.keys(this.groupedVideos);
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
    setTimeout(() => {
      this.updateControls();
    }, 100);

  }


  /**
   * Closes the expanded video view if the click is outside the video element.
   * @param event - The mouse event triggered when clicking outside the video.
   */
  closeVideo(event: MouseEvent) {
    // Check if the click is outside the video element
    if (event.target === event.currentTarget) {
      this.expandedVideoElement = null;
      this.expandedVideoSrc = null;
      this.isPlaying = false;
    }
  }


   /**
   * Closes the expanded video view if click th back button.
   * @param event - The mouse event triggered when clicking outside the video.
   */
   closeVideoWithButton() {  
      this.expandedVideoElement = null;
      this.expandedVideoSrc = null;
      this.isPlaying = false;
  }


  /**
   * Toggles the play or pause state of the video.
   * @param event - The event triggered by clicking the play/pause button.
   */
  togglePlay(event: Event) {
    event.preventDefault(); // Verhindert den Standard-Klickeffekt
    event.stopPropagation(); // Stoppt die Ausbreitung des Click-Events

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
      }, 300); 
    }
  }


  /**
   * starts the pop animation for the fav icon (heart) at the hovered video
   */
  triggerHoveredVideoFavIcon() {
    const infoBoxElements = document.querySelectorAll('.favorite-icon-infobox');

    infoBoxElements.forEach(infoBoxElement => {
      infoBoxElement.classList.add('animate');
      setTimeout(() => {
        infoBoxElement.classList.remove('animate');
      }, 300); // Dauer der Animation in Millisekunden
    });
  }


  /**
   * Open the preview Video in expanded version
   */
  openPreviewVideo(){
    const previewVideo = this.videos.find(video => video.id === 27);

    if (previewVideo) {
        this.expandedVideoElement = previewVideo; 
        this.expandedVideoSrc = previewVideo.video_file;  
        this.currentVideo = previewVideo;  
    } else {
        console.error('Video mit gesuchter ID nicht gefunden.');
    }
  }


  /**
   * Remove or add the controls for the expanded video for the mobile version
   */
  updateControls() {
    if( this.sizeVideo){
      const videoElement = this.sizeVideo.nativeElement;
      if (window.innerWidth < 600) {
        videoElement.removeAttribute('controls');
      } else {
        videoElement.setAttribute('controls', 'true');
      }
    }
  }


  // Event-Listener for the Windows resize, to remove the controls for the expanded video
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.updateControls();
  }


  /**
   * make video in preview to fullscreen video
   */
  playResponsiveVideo(){
    const video = this.sizeVideo.nativeElement;
    if (video){

      video.classList.add('fullscreen-active')
      video.requestFullscreen() 
      
    }
  }


  /**
   * Route to Data protection
   */
  routeToDataProtection(){
    this.router.navigate(['data-protection'])
  }


  /**
   * Route to Impressum
   */
  routeToImpressum(){
    this.router.navigate(['impressum'])
  }

} 
