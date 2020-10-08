import { SourceLocation } from '@angular/localize/src/utils';
import { Path, SourceFile } from 'typescript';
import { Musica } from './musica';

export class Playlist{
    id: Number
    nome: String
    musicas :Musica[]
    capa: String
}
