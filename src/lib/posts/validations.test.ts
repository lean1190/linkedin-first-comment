import { describe, expect, it } from 'vitest';
import type { DraftPost, Post, ReadyPost } from './database/types';
import { isDraftPost, isMinimumPost, isReadyPost } from './validations';

describe('isMinimumPost', () => {
  it('should return true for a valid minimum post', () => {
    const post: ReadyPost = {
      id: '123',
      content: 'This is a ready post',
      comment: 'This is a comment',
      post_at_utc: null as unknown as string,
      repost_at_utc: null,
      status: 'scheduled',
      author: 'author',
      created_at: 'now',
      urn: null
    };

    expect(isMinimumPost(post)).toBe(true);
  });

  it('should return false if post is undefined', () => {
    expect(isMinimumPost(undefined)).toBe(false);
  });

  it('should return false if post is null', () => {
    expect(isMinimumPost(null as unknown as Post)).toBe(false);
  });

  it('should return false if post has no content', () => {
    const post = { comment: 'Missing content', post_at_utc: '2025-02-14T12:00:00Z' } as Post;
    expect(isMinimumPost(post)).toBe(false);
  });

  it('should return false if post has no comment', () => {
    const post = { content: 'Missing comment', post_at_utc: '2025-02-14T12:00:00Z' } as Post;
    expect(isMinimumPost(post)).toBe(false);
  });
});

describe('isReadyPost', () => {
  it('should return true for a valid ReadyPost', () => {
    const post: ReadyPost = {
      id: '123',
      content: 'This is a ready post',
      comment: 'This is a comment',
      post_at_utc: '2025-02-14T12:00:00Z',
      repost_at_utc: '2025-02-16T12:00:00Z',
      status: 'scheduled',
      author: 'author',
      created_at: 'now',
      urn: null
    };

    expect(isReadyPost(post)).toBe(true);
  });

  it('should return false if post is undefined', () => {
    expect(isReadyPost(undefined)).toBe(false);
  });

  it('should return false if post is null', () => {
    expect(isReadyPost(null as unknown as Post)).toBe(false);
  });

  it('should return false if post has no content', () => {
    const post = { comment: 'Missing content', post_at_utc: '2025-02-14T12:00:00Z' } as Post;
    expect(isReadyPost(post)).toBe(false);
  });

  it('should return false if post has no comment', () => {
    const post = { content: 'Missing comment', post_at_utc: '2025-02-14T12:00:00Z' } as Post;
    expect(isReadyPost(post)).toBe(false);
  });

  it('should return false if post_at_utc is missing', () => {
    const post = { content: 'Valid content', comment: 'Valid comment' } as Post;
    expect(isReadyPost(post)).toBe(false);
  });
});

describe('isDraftPost', () => {
  it('should return true for a valid DraftPost', () => {
    const post: DraftPost = {
      id: '456',
      content: 'This is a draft post',
      comment: null,
      post_at_utc: null,
      repost_at_utc: null,
      status: 'draft',
      author: 'author',
      created_at: 'now',
      urn: null
    };
    expect(isDraftPost(post)).toBe(true);
  });

  it('should return false if post is undefined', () => {
    expect(isDraftPost(undefined)).toBe(false);
  });

  it('should return false if post is null', () => {
    expect(isDraftPost(null as unknown as Post)).toBe(false);
  });

  it('should return false if post has no id', () => {
    const post = { content: 'No ID', status: 'draft' } as Post;
    expect(isDraftPost(post)).toBe(false);
  });

  it('should return false if post has no content', () => {
    const post = { id: '789', status: 'draft' } as Post;
    expect(isDraftPost(post)).toBe(false);
  });

  it('should return false if post status is not "draft"', () => {
    const post = { id: '456', status: 'posted' } as Post;
    expect(isDraftPost(post)).toBe(false);
  });
});
