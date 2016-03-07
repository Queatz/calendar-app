package com.queatz.calendar;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

/**
 * Created by jacob on 12/24/15.
 */

@Entity
public class Note {
    @Id
    public Long id;

    @Index
    public int year;

    @Index
    public int month;

    @Index
    public int day;

    public String text;

    public Note() {}

    public Note(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
