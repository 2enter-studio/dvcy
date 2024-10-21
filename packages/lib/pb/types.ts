/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Paints = "paints",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum PaintsTypeOptions {
	"E0" = "0",
	"E1" = "1",
	"E2" = "2",
	"E3" = "3",
	"E4" = "4",
}

export enum PaintsSourceOptions {
	"chiayiartmuseum" = "chiayiartmuseum",
	"youtube" = "youtube",
	"unknown" = "unknown",
}

export enum PaintsLocaleOptions {
	"zh-tw" = "zh-tw",
	"en" = "en",
}
export type PaintsRecord = {
	draw_duration?: number
	locale: PaintsLocaleOptions
	paint: string
	sign: string
	source: PaintsSourceOptions
	type: PaintsTypeOptions
	user_agent?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type PaintsResponse<Texpand = unknown> = Required<PaintsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	paints: PaintsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	paints: PaintsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'paints'): RecordService<PaintsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
