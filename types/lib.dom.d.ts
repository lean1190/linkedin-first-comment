interface UmamiTracking {
    track: (event: string, payload?: unknown) => void
}

interface Window {
    umami: UmamiTracking;
}
