import { TestBed } from '@angular/core/testing';

import { PlaylistClicadaService } from './playlist-clicada.service';

describe('PlaylistClicadaService', () => {
  let service: PlaylistClicadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistClicadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
