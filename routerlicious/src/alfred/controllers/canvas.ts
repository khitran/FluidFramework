import * as $ from "jquery";
import * as api from "../../api";
import { Canvas, throttle } from "../../canvas";
import * as ink from "../../ink";
import * as shared from "../../shared";
import * as socketStorage from "../../socket-storage";

socketStorage.registerAsDefault(document.location.origin);

async function loadDocument(id: string): Promise<api.Document> {
    console.log("Loading in root document...");
    const document = await api.load(id);

    console.log("Document loaded");
    return document;
}

// throttle resize events and replace with an optimized version
throttle("resize", "throttled-resize");

let canvas: Canvas;

export async function initialize(id: string, config: any) {
    const doc = await loadDocument(id);
    const root = await doc.getRoot().getView();

    // Bootstrap worker service.
    if (config.permission.canvas) {
        shared.registerWorker(config);
    }

    if (!root.has("ink")) {
        root.set("ink", doc.createInk());
    }

    if (!root.has("components")) {
        root.set("components", doc.createMap());
    }

    $("document").ready(() => {
        canvas = new Canvas(root.get("ink") as ink.IInk, root.get("components") as api.IMap);
    });
}
