/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { Delta } from "../changeset";
import { ChangeRebaser } from "../rebase";
import { AnchorSet } from "../tree";

export interface ChangeFamily<TEditor, TChange> {
    buildEditor(deltaReceiver: (delta: Delta.Root) => void, anchorSet: AnchorSet): TEditor;
    intoDelta(change: TChange): Delta.Root;
    // TODO more specific types
    readonly rebaser: ChangeRebaser<TChange, TChange, TChange>;
}