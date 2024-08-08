import { Component, OnInit, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {


  videoService = inject(VideoService)
  videos: any[] = [];
  groupedVideos: { [key: string]: any[] } = {};


  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.videos = data;
      this.groupVideosByCategory();
    });
  }

  groupVideosByCategory(): void {
    this.groupedVideos = this.videos.reduce((groups, video) => {
      const category = video.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(video);
      console.log(groups);
      
      return groups;
    
    }, {});
  }


  getCategories(): string[] {
    return Object.keys(this.groupedVideos);
  }


}
