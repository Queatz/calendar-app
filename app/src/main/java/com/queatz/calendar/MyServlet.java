package com.queatz.calendar;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyServlet extends HttpServlet {
    Gson gson = new GsonBuilder().create();

    public MyServlet() {
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String[] path = req.getRequestURI().split("/");
        path = Arrays.copyOfRange(path, 2, path.length);

        if (path.length == 3) {
            if ("notes".equals(path[0])) {
                int year = Integer.parseInt(path[1]);
                int month = Integer.parseInt(path[2]);

                List<Note> notes = OfyService.ofy().load().type(Note.class).filter("year", year).filter("month", month).list();

                resp.setCharacterEncoding("UTF-8");
                resp.getWriter().write(gson.toJson(notes));
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String[] path = req.getRequestURI().split("/");
        path = Arrays.copyOfRange(path, 2, path.length);

        if (path.length == 4) {
            if ("notes".equals(path[0])) {
                int year = Integer.parseInt(path[1]);
                int month = Integer.parseInt(path[2]);
                int day = Integer.parseInt(path[3]);

                Note note = OfyService.ofy().load().type(Note.class)
                    .filter("year", year).filter("month", month).filter("day", day).first().now();

                if (note == null) {
                    note = new Note(year, month, day);
                }

                char[] text = new char[req.getContentLength()];
                req.getReader().read(text, 0, req.getContentLength());

                note.text = String.valueOf(text);

                OfyService.ofy().save().entity(note).now();
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    }
}