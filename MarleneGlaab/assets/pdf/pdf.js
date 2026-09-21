document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();

    const url = link.getAttribute('href');
    const dateiname = url.split('/').pop();

    try {
      const antwort = await fetch(url);
      const blob = await antwort.blob();
      const blobUrl = URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = dateiname;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      URL.revokeObjectURL(blobUrl);
    } catch (fehler) {
      window.location.href = url;
    }
  });
});