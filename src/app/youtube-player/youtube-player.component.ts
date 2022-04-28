import {Component, OnInit, OnDestroy} from '@angular/core';
import {YoutubeService} from '../services/youtube.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy {
  song: any;
  sub: Subscription = new Subscription;

  constructor(private youtubeService: YoutubeService,
              private activatedRouter: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.song = this.youtubeService.find(id);
    });
  }


  getSrc() {
    const url = 'https://www.youtube.com/embed/' + this.song.id;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
