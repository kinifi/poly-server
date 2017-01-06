// This is using a 3rd party asset from the asset store called BESTHTTP
// After importing BESTHTTP uncomment the methods one at a time from start to test everything

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SimpleJSON;
using UnityEngine.Networking;
using BestHTTP;
using System;

namespace expresslb
{
    public class expresslb : MonoBehaviour
    {

        // Use this for initialization
        public void Start()
        {

            //CreateNewPlayer("unity", 666);
            //GetPlayers(10);
            //UpdatePlayer("unity", 2002);
            //DeletePlayer("unity");

        }

        private void DeletePlayer(string playername)
        {
            HTTPRequest request = new HTTPRequest(new Uri("https://express-leaderboards.herokuapp.com/api/player/" + playername), HTTPMethods.Delete, OnDeletePlayer);
            request.Send();
        }

        private void OnDeletePlayer(HTTPRequest request, HTTPResponse response)
        {
            Debug.Log("Delete: " + response.DataAsText);
        }

        private void UpdatePlayer(string playername, long score)
        {
            HTTPRequest request = new HTTPRequest(new Uri("https://express-leaderboards.herokuapp.com/api/player/" + playername + "/" + score), HTTPMethods.Put, OnUpdatePlayer);
            request.Send();
        }

        private void OnUpdatePlayer(HTTPRequest request, HTTPResponse response)
        {
            Debug.Log("Put: " + response.DataAsText);
        }

        //creates a new player
        private void CreateNewPlayer(string playername, long score)
        {
            HTTPRequest request = new HTTPRequest(new Uri("https://express-leaderboards.herokuapp.com/api/player"), HTTPMethods.Post, OnCreateNewPlayer);
            request.AddField("name", playername);
            request.AddField("score", score.ToString());
            request.Send();
        }

        private void OnCreateNewPlayer(HTTPRequest request, HTTPResponse response)
        {
            Debug.Log("Post: " + response.DataAsText);
        }

        //Test that requests all the players in the database
        private void GetPlayers(int numPlayersRequested)
        {
            HTTPRequest request = new HTTPRequest(new Uri("https://express-leaderboards.herokuapp.com/api/players/" + numPlayersRequested), OnGetPlayers);
            request.Send();
        }

        void OnGetPlayers(HTTPRequest request, HTTPResponse response)
        {
            Debug.Log("Get: " + response.DataAsText);
        }

    }
}

