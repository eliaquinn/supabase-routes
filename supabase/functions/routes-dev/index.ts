import express from 'npm:express@latest';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
)

const app = express()
app.use(express.json())
// If you want a payload larger than 100kb, then you can tweak it here:
// app.use( express.json({ limit : "300kb" }));

const port = 3000

app.get('/routes-dev', async (req, res) => {
  try {
    const { data, error } = await supabase.from('values').select('*');

    if (error) {
      throw error
    }

    res.send({
      msg: data
    })
  } catch (err) {
    console.error(err)
  }
})

app.post('/hello-world', (req, res) => {
  const { name } = req.body
  res.send({
    msg: `Hello ${name}! - POST Route`
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})