<template>
    <div className="stats-container">
      <div className="games you-win">
        <h3><i className="fal fa-times"></i> (You)</h3>
        <h4>0</h4>
      </div>
      <div className="games ties">
        <h3>Ties</h3>
        <h4>0</h4>
      </div>
      <div className="games adversary-win">
        <h3><i className="far fa-circle"></i> (CPU)</h3>
        <h4>0</h4>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Panel'
}
</script>