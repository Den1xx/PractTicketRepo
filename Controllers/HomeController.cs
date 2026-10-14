using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pract.Models;

namespace Pract.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Ticket()
        {
            return View();
        }

    }
}
