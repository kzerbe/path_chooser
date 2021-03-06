import {Injectable} from '@angular/core';
import {Observable, of, range} from 'rxjs';
import {map, mapTo, toArray} from 'rxjs/operators';

export enum Mode {
  one = 1,
  two,
  three,
  four
}

interface Pair {
  key: Mode;
  value: string;
}

export const Modes = range(1, 4).pipe(map(m =>  m as Mode), toArray());

export interface PathItem {
  label: string;
  value: string;
  hidden: boolean;
  listItems: Observable<string[]>;
}

export interface Choice {
  itemIndex: number;
  value: string;
}


const PathItems: PathItem[] = [
  {label: 'Interfaces', value: '', hidden: false,
    listItems: of('backplane', 'madi0', 'madi1', 'strm0', 'strm1')
      .pipe(toArray())},
  {label: 'Streams', value: '', hidden: false,
    listItems: of('stream0', 'stream1', 'stream2', 'stream3', 'stream4', 'stream5')
      .pipe(toArray())},
  {label: 'First Channel', value: '', hidden: false,
    listItems: range(0, 64)
      .pipe(map(num => num.toString()), toArray())},
  {label: 'ChannelCount', value: '', hidden: false,
    listItems: of(1, 2, 4, 8, 16, 32, 64)
      .pipe(map(n => n.toString()), toArray())},
];

const PathItems2: PathItem[] = [
  {label: 'Reich', value: '', hidden: false,
    listItems: of('tier', 'pflanze', 'pilz', 'virus')
      .pipe(toArray())},
  {label: 'Klasse', value: '', hidden: false,
    listItems: of('fisch', 'amphibie', 'reptil', 'vogel', 'säugetier')
      .pipe(toArray())},
  {label: 'Familie', value: '', hidden: false,
    listItems: of('hund', 'katze', 'kuh', 'ziege', 'maus')
      .pipe(toArray())},
];


@Injectable()
export class PathService {
  get pathStreamItems() {
    let pathItems = PathItems;
    return this.hideDependend(pathItems, 0);
  }

  get animals() {
    return PathItems2;
  }

  hideDependend(items: PathItem[], start: number): PathItem[]  {
    items[start].hidden = false;
    items[start].value = '';

    for (let idx: number = ++start; idx < items.length; ++idx) {
      items[idx].hidden = true;
    }

    return items;
  }
}
