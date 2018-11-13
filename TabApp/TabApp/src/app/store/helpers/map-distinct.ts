import { Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

export function mapDistinct<T, R>(input: Observable<T>, mapFn: (input: T) => R): Observable<R> {
    return input.pipe(map(mapFn), distinctUntilChanged());
}
